import React, { useState, useEffect } from "react";
import { styles } from "../styles";
import { GitHubCalendar } from "react-github-calendar";

const GitHubActivity = () => {
  const [stats, setStats] = useState({
    repos: 0,
    followers: 0,
    stars: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGitHubStats = async () => {
      try {
        const username = "SinghSwayam";
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`),
          fetch(`https://api.github.com/users/${username}/repos?per_page=100`),
        ]);

        if (!userRes.ok || !reposRes.ok) throw new Error("GitHub API Error");

        const userData = await userRes.json();
        const reposData = await reposRes.json();

        const totalStars = reposData.reduce((acc, repo) => acc + repo.stargazers_count, 0);

        setStats({
          repos: userData.public_repos,
          followers: userData.followers,
          stars: totalStars,
        });
      } catch (error) {
        console.error("Error fetching GitHub stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubStats();
  }, []);

  const selectLastHalfYear = (contributions) => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const shownMonths = 6;

    return contributions.filter((activity) => {
      const date = new Date(activity.date);
      const monthOfDay = date.getMonth();
      const yearOfDay = date.getFullYear();
      const monthsAgo = (currentYear - yearOfDay) * 12 + (currentMonth - monthOfDay);
      return monthsAgo >= 0 && monthsAgo < shownMonths;
    });
  };

  // Bauhaus GitHub calendar theme — Red primary on off-white
  const bhTheme = {
    light: [
      "#E0E0E0",   // bh-muted (empty)
      "#F0C020",   // Bauhaus Yellow (low)
      "#D07010",   // Orange-Yellow (mid-low)
      "#D02020",   // Bauhaus Red (mid-high)
      "#1040C0",   // Bauhaus Blue (max)
    ],
    dark: [
      "#E0E0E0",
      "#F0C020",
      "#D07010",
      "#D02020",
      "#1040C0",
    ],
  };

  // Stat cards data
  const statCards = [
    { label: "REPOSITORIES", value: stats.repos, accent: "#1040C0", textColor: "white" },
    { label: "FOLLOWERS",    value: stats.followers, accent: "#F0C020", textColor: "#121212" },
    { label: "TOTAL STARS",  value: stats.stars, accent: "#D02020", textColor: "white" },
  ];

  return (
    <section className={`max-w-7xl mx-auto ${styles.padding} relative z-10 min-h-[60vh] flex flex-col justify-center`}>

      <div className="w-full flex justify-between items-center bg-white border-4 border-bh-border p-6 shadow-[8px_8px_0px_0px_#121212] mb-16 max-w-fit flex-col md:flex-row gap-6">
        <div>
          <p className={styles.sectionSubText}>// 04 SOURCE</p>
          <h2 className={`${styles.sectionHeadText} leading-[1]`}>GITHUB ACTIVITY.</h2>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start lg:items-center">

        {/* Left: Stats */}
        <div className="w-full lg:w-1/3 flex flex-col gap-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-1 gap-6">
            {statCards.map((card) => (
              <div
                key={card.label}
                className="border-4 border-bh-border bg-white p-6 shadow-[4px_4px_0px_0px_#121212] flex flex-col hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_#121212] transition-all group"
              >
                <span className="font-outfit text-xs font-black text-[#888] uppercase tracking-widest mb-1">
                  [ {card.label} ]
                </span>
                <span
                  className="font-outfit font-black text-5xl mt-2 transition-colors group-hover:text-white "
                  style={{ color: card.accent }}
                >
                  {loading ? "--" : card.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Calendar */}
        <div className="w-full lg:w-2/3 border-4 border-bh-border p-6 sm:p-10 bg-white shadow-[8px_8px_0px_0px_#121212]">
          <h3 className="font-outfit font-black text-bh-fg mb-8 uppercase text-sm border-b-4 border-bh-border pb-4 tracking-widest">
            [ GITHUB CALENDAR ]
          </h3>

          <div className="w-full overflow-x-auto pb-4 min-h-[160px] flex items-center justify-center border-4 border-bh-border px-4">
            <GitHubCalendar
              username="SinghSwayam"
              blockSize={14}
              blockMargin={5}
              fontSize={12}
              hideTotalCount
              transformData={selectLastHalfYear}
              theme={bhTheme}
              colorScheme="light"
              errorMessage="[ GITHUB CALENDAR UNAVAILABLE - API LIMIT ]"
              throwOnError={false}
              renderBlock={(block, activity) =>
                React.cloneElement(block, {
                  title: `${activity.count} contributions on ${activity.date}`,
                })
              }
            />
          </div>

          <div className="mt-8 flex justify-end">
            <a href="https://github.com/SinghSwayam" target="_blank" rel="noreferrer">
              <button className="bh-btn bh-btn-blue">
                VIEW GITHUB PROFILE
              </button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GitHubActivity;