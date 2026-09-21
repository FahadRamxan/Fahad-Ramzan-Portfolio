import { useEffect, useState } from 'react'

// Fetches live GitHub profile + repo data from the public REST API.
// Results are cached in sessionStorage for the tab session to avoid
// hitting the unauthenticated rate limit on re-renders / navigation.
const CACHE_KEY = (u) => `gh-cache:${u}`
const CACHE_TTL = 1000 * 60 * 30 // 30 minutes

export function useGitHub(username) {
  const [state, setState] = useState({
    loading: true,
    error: null,
    data: null,
  })

  useEffect(() => {
    let active = true

    async function load() {
      // Try cache first; keep any cached payload for a stale fallback on error.
      let staleData = null
      try {
        const raw = sessionStorage.getItem(CACHE_KEY(username))
        if (raw) {
          const cached = JSON.parse(raw)
          if (cached.data) staleData = cached.data
          if (cached.at && Date.now() - cached.at < CACHE_TTL) {
            setState({ loading: false, error: null, data: cached.data })
            return
          }
        }
      } catch {
        /* ignore cache errors */
      }

      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`),
          fetch(
            `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
          ),
        ])

        if (!userRes.ok) throw new Error(`GitHub API ${userRes.status}`)

        const user = await userRes.json()
        const repos = reposRes.ok ? await reposRes.json() : []

        const owned = Array.isArray(repos)
          ? repos.filter((r) => !r.fork)
          : []

        const totalStars = owned.reduce(
          (sum, r) => sum + (r.stargazers_count || 0),
          0,
        )

        // Language frequency across owned repos.
        const langCount = {}
        owned.forEach((r) => {
          if (r.language) langCount[r.language] = (langCount[r.language] || 0) + 1
        })
        const topLanguages = Object.entries(langCount)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 6)
          .map(([name, count]) => ({ name, count }))

        const topRepos = [...owned]
          .sort(
            (a, b) =>
              (b.stargazers_count || 0) - (a.stargazers_count || 0) ||
              new Date(b.pushed_at) - new Date(a.pushed_at),
          )
          .slice(0, 4)
          .map((r) => ({
            name: r.name,
            description: r.description,
            url: r.html_url,
            stars: r.stargazers_count || 0,
            forks: r.forks_count || 0,
            language: r.language,
            updated: r.pushed_at,
          }))

        const data = {
          avatar: user.avatar_url,
          name: user.name,
          bio: user.bio,
          followers: user.followers,
          following: user.following,
          publicRepos: user.public_repos,
          htmlUrl: user.html_url,
          totalStars,
          topLanguages,
          topRepos,
        }

        try {
          sessionStorage.setItem(
            CACHE_KEY(username),
            JSON.stringify({ at: Date.now(), data }),
          )
        } catch {
          /* ignore quota errors */
        }

        if (active) setState({ loading: false, error: null, data })
      } catch (err) {
        if (!active) return
        // Prefer showing stale-but-real data over an error card.
        if (staleData) {
          setState({ loading: false, error: null, data: staleData })
        } else {
          setState({ loading: false, error: err.message || 'Failed', data: null })
        }
      }
    }

    load()
    return () => {
      active = false
    }
  }, [username])

  return state
}
