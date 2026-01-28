import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import { GitHubCalendar } from "react-github-calendar";
import { styles } from "../styles";
import SectionWrapper from "../hoc/SectionWrapper";
import { fadeIn, textVariant } from "../utils/motion";
import { motion as Motion } from "framer-motion";
import { DataStreamBackground } from "./design/SectionBackgrounds";

import prIcon from "../assets/gi_icons/pr_icon.svg";
import issueIcon from "../assets/gi_icons/issue_icon.svg";
import mergeIcon from "../assets/gi_icons/merge_icon.svg";

import useTheme from "../hooks/useTheme";

const GitHubActivity = () => {
  const [activities, setActivities] = useState([]);
  const themeMode = useTheme();

  const [loading, setLoading] = useState(true);

  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const theme = {
    light: ["#ebedf0", "#915EFF"],
    dark: ["#161b22", "#915EFF"],
  };

  useEffect(() => {
    const fetchGitHubActivity = async () => {
      try {
        const response = await fetch(
          "https://api.github.com/users/SinghSwayam/events/public?per_page=100"
        );
        const data = await response.json();
        if (!Array.isArray(data)) { setLoading(false); return; }

        const contributions = data.map((event) => {
          let type = "";
          let title = "";
          let url = "";
          let repoName = event.repo.name.split("/").pop();

          if (event.type === "PullRequestEvent") {
            const isMerged = event.payload.action === "closed" && event.payload.pull_request?.merged;
            type = isMerged ? "Merged PR" : `PR ${event.payload.action}`;
            title = event.payload.pull_request?.title || `Contribution to PR #${event.payload.number}`;
            url = event.payload.pull_request?.html_url;
          } else if (event.type === "IssuesEvent" && event.payload.action === "opened") {
            type = "Issue Opened";
            title = event.payload.issue?.title;
            url = event.payload.issue?.html_url;
          } else if (event.type === "IssueCommentEvent") {
            type = "Issue Contribution";
            title = event.payload.issue?.title;
            url = event.payload.comment?.html_url;
          }
          if (!type || !title || !url) return null;

          return {
            id: event.id,
            type,
            title,
            repo: repoName,
            link: url,
            date: new Date(event.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
          };
        }).filter(Boolean).filter((v, i, a) => a.findIndex((t) => t.link === v.link) === i).slice(0, 10).reverse();

        setActivities(contributions);
        setLoading(false);
      } catch (error) {

        console.error("Github fetch error:", error);
        setLoading(false);
      }
    };
    fetchGitHubActivity();
  }, []);

  const checkScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 2);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 2);
    }
  };

  useLayoutEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
      setTimeout(checkScrollButtons, 100);
    }
  }, [activities]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = 320;
      if (direction === "left") current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      else current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      setTimeout(checkScrollButtons, 500);
    }
  };

  const getIcon = (type) => {
    if (type.includes("Merged")) return mergeIcon;
    if (type.includes("PR")) return prIcon;
    return issueIcon;
  };

  return (
    <>
      <DataStreamBackground />

      <Motion.div variants={textVariant()} className="-mt-10 relative z-10">
        <p className={styles.sectionSubText}>Contribution Graph</p>
        <h2 className={styles.sectionHeadText}>Open Source Activity.</h2>
      </Motion.div>

      <div className="flex flex-col gap-2 mt-6 relative z-10">
        <Motion.div
          variants={fadeIn("up", "spring", 0.3, 0.75)}
          className={`w-full backdrop-blur-md rounded-2xl p-4 md:p-8 flex flex-col items-center justify-center relative shadow-lg ${themeMode === "light" ? "bg-white/50 border border-black/5" : "bg-[#101420]/30 border border-white/5"}`}
        >
          <div className={`absolute inset-0 bg-gradient-to-r pointer-events-none rounded-2xl ${themeMode === "light" ? "from-transparent via-black/[0.02] to-transparent" : "from-transparent via-white/[0.02] to-transparent"}`}></div>
          <div className="w-full overflow-x-auto custom-scrollbar flex justify-start md:justify-center">
            <div className="min-w-[700px]">
              <GitHubCalendar
                username="SinghSwayam"
                blockSize={13}
                blockMargin={4}
                colorScheme={themeMode}
                theme={theme}
                fontSize={14}
              />
            </div>
          </div>
        </Motion.div>

        <Motion.div
          variants={fadeIn("up", "spring", 0.5, 0.75)}
          className="w-full"
        >
          <div className="flex items-center gap-4 mb-2">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full border shadow-sm ${themeMode === "light" ? "bg-white/80 border-black/5" : "bg-[#101420]/50 border-white/5"}`}>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-secondary text-sm font-medium tracking-wide">Recent Updates</span>
            </div>
            <span className="h-px flex-1 border-t border-dashed border-text-primary/10"></span>
            <div className="hidden sm:flex items-center gap-4 text-[10px] text-secondary font-mono uppercase tracking-widest opacity-60">
              <span>&larr;</span>
              <span>&rarr;</span>
            </div>
          </div>

          <div className="relative w-full group/container">

            <div className="absolute top-[28px] left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#915EFF]/30 to-[#915EFF] z-0" />

            <button
              onClick={() => scroll("left")}
              className={`absolute left-0 top-[18px] -translate-y-1/2 z-50 p-2 rounded-full bg-tertiary/90 text-text-primary/70 hover:bg-[#915EFF] hover:text-text-primary transition-all active:scale-95 border border-text-primary/10 ${canScrollLeft ? "flex" : "hidden"}`}
              aria-label="Scroll Left"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>

            <button
              onClick={() => scroll("right")}
              className={`absolute right-0 top-[18px] -translate-y-1/2 z-50 p-2 rounded-full bg-tertiary/90 text-text-primary/70 hover:bg-[#915EFF] hover:text-text-primary transition-all active:scale-95 border border-text-primary/10 ${canScrollRight ? "flex" : "hidden"}`}
              aria-label="Scroll Right"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>

            <div
              ref={scrollRef}
              onScroll={checkScrollButtons}
              className="flex overflow-x-auto gap-8 sm:gap-12 pb-12 px-8 sm:px-12 no-scrollbar scroll-smooth"
            >
              {loading ? (
                <div className="text-secondary italic pl-6">Loading timeline...</div>
              ) : (
                activities.map((activity, index) => (
                  <div key={activity.id} className="relative min-w-[260px] sm:min-w-[280px] pt-14 group">
                    <div className="absolute top-[32px] left-1/2 w-0.5 h-12 bg-gradient-to-b from-[#915EFF] to-transparent -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>
                    <div className={`absolute top-[12px] left-1/2 -translate-x-1/2 w-8 h-8 rounded-full border border-[#151030]  z-10 flex items-center justify-center transition-all duration-300 group-hover:scale-125 group-hover:border-[#915EFF] group-hover:shadow-[0_0_15px_#915EFF] ${themeMode === "light" ? "bg-[#915EFF]" : "bg-[#1c1836]"}`}>
                      {index === activities.length - 1 && (
                        <span className="absolute inset-0 rounded-full bg-[#915EFF] opacity-40 animate-ping group-hover:hidden"></span>
                      )}
                      <div className={`w-full h-full rounded-full flex items-center justify-center ${activity.type.includes("Merged") ? "bg-green-500/10" : "bg-[#915EFF]/10"}`}>
                        <img src={getIcon(activity.type)} alt="type" className="w-4 h-4 object-contain opacity-100" style={{ filter: "brightness(0) invert(1)" }} />
                      </div>
                    </div>
                    <a href={activity.link} target="_blank" rel="noreferrer" className={`block p-5 rounded-xl transition-all duration-300 shadow-lg backdrop-blur-sm group-hover:shadow-[0_10px_30px_-10px_rgba(145,94,255,0.3)] ${themeMode === "light" ? "bg-white border border-black/5 group-hover:border-[#915EFF]/40" : "bg-[#101420]/40 border border-white/5 group-hover:bg-[#101420]/80 group-hover:border-[#915EFF]/40"}`}>
                      <div className="flex justify-between items-start mb-3">
                        <span className={`text-[10px] px-2 py-0.5 rounded border font-mono tracking-wide uppercase transition-colors duration-300 ${activity.type.includes("Merged") ? "border-green-500/20 text-green-400 bg-green-500/5 group-hover:bg-green-500/10" : "border-[#915EFF]/20 text-[#915EFF] bg-[#915EFF]/5 group-hover:bg-[#915EFF]/10"}`}>
                          {activity.type}
                        </span>
                        <span className="text-[11px] text-secondary font-mono group-hover:text-text-primary transition-colors">{activity.date}</span>
                      </div>
                      <h4 className="text-text-primary text-[14px] font-semibold leading-snug mb-3 transition-colors duration-300 group-hover:text-[#915EFF] line-clamp-2 min-h-[40px]">{activity.title}</h4>
                      <div className="flex items-center gap-2 pt-2 border-t border-white/5 group-hover:border-white/10 transition-colors">
                        <span className="text-[11px] text-secondary/60 italic font-mono truncate w-full group-hover:text-secondary">/{activity.repo}</span>
                      </div>
                    </a>
                  </div>
                ))
              )}
              <div className="min-w-[20px]" />
            </div>
          </div>
        </Motion.div>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .custom-scrollbar::-webkit-scrollbar { height: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #915EFF; border-radius: 4px; }
      `}</style>
    </>
  );
};

const GitHubActivityComponent = SectionWrapper(GitHubActivity, "github");
export default GitHubActivityComponent;