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

  const selectLastHalfYear = contributions => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const shownMonths = 6;
    
    return contributions.filter(activity => {
      const date = new Date(activity.date);
      const monthOfDay = date.getMonth();
      const yearOfDay = date.getFullYear();
      
      // Calculate how many months ago the activity was
      const monthsAgo = (currentYear - yearOfDay) * 12 + (currentMonth - monthOfDay);
      
      return monthsAgo >= 0 && monthsAgo < shownMonths;
    });
  };

  const nbTheme = {
    light: [
      '#1E1E1E', // Level 0
      '#3f420c', // Level 1
      '#757A17', // Level 2
      '#AFB822', // Level 3
      '#F5FF30', // Level 4 (Accent)
    ],
    dark: [
      '#1E1E1E', 
      '#3f420c', 
      '#757A17', 
      '#AFB822', 
      '#F5FF30', 
    ],
  };

  return (
    <section className={`max-w-7xl mx-auto ${styles.padding} relative z-10 min-h-[60vh] flex flex-col justify-center`}>
      <div className="w-full flex justify-between items-center bg-nb-bg border-[3px] border-nb-border p-6 shadow-[8px_8px_0_#FFF] mb-16 max-w-fit flex-col md:flex-row gap-6">
        <div>
          <p className={styles.sectionSubText}>// 04 SOURCE</p>
          <h2 className={`${styles.sectionHeadText} leading-[1]`}>GITHUB ACTIVITY.</h2>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start lg:items-center">
        {/* Left Side: Stats Block */}
        <div className="w-full lg:w-1/3 flex flex-col gap-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-1 gap-6">
            
            <div className="border-[3px] border-nb-border bg-nb-surface p-6 shadow-[4px_4px_0_#FFF] flex flex-col hover:border-nb-accent hover:-translate-y-1 transition-all">
              <span className="font-mono text-xs font-bold text-nb-muted uppercase">[ REPOSITORIES ]</span>
              <span className="font-space font-black text-5xl mt-2 text-nb-text">{loading ? "--" : stats.repos}</span>
            </div>

            <div className="border-[3px] border-nb-border bg-nb-surface p-6 shadow-[4px_4px_0_#FFF] flex flex-col hover:border-nb-accent hover:-translate-y-1 transition-all">
              <span className="font-mono text-xs font-bold text-nb-muted uppercase">[ FOLLOWERS ]</span>
              <span className="font-space font-black text-5xl mt-2 text-nb-text">{loading ? "--" : stats.followers}</span>
            </div>

            <div className="border-[3px] border-nb-border bg-nb-surface p-6 shadow-[4px_4px_0_#FFF] flex flex-col hover:border-nb-accent hover:-translate-y-1 transition-all col-span-2 md:col-span-1">
              <span className="font-mono text-xs font-bold text-nb-muted uppercase">[ TOTAL STARS ]</span>
              <span className="font-space font-black text-5xl mt-2 text-nb-accent">{loading ? "--" : stats.stars}</span>
            </div>
            
          </div>
        </div>

        {/* Right Side: Calendar Block */}
        <div className="w-full lg:w-2/3 border-[3px] border-nb-border p-6 sm:p-10 bg-nb-surface shadow-[8px_8px_0_#FFF]">
          <h3 className="font-mono font-bold text-nb-muted mb-8 uppercase text-sm border-b-[3px] border-nb-border-muted pb-4">
            [ CONTRIBUTIONS MAP - LAST 6 MONTHS ]
          </h3>

          <div className="w-full overflow-x-auto pb-4 custom-scrollbar min-h-[160px] flex items-center justify-center border-[3px] border-nb-border px-4">
            <GitHubCalendar
              username="SinghSwayam"
              blockSize={14}
              blockMargin={5}
              fontSize={12}
              hideTotalCount
              transformData={selectLastHalfYear}
              theme={nbTheme}
              colorScheme="dark"
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
              <button className="nb-button bg-nb-accent text-[#0D0D0D]">
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