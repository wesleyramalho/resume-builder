import { Resume } from "@/types/resume";

interface Props {
  resumes: Resume[];
}

function computeProfileScore(resumes: Resume[]): number {
  if (resumes.length === 0) return 0;
  const best = resumes.reduce((prev, cur) => {
    const score = scoreResume(cur);
    return score > scoreResume(prev) ? cur : prev;
  });
  return scoreResume(best);
}

function scoreResume(resume: Resume): number {
  const d = resume.data;
  let score = 0;
  if (d.fullName) score += 10;
  if (d.headline) score += 10;
  if (d.summary) score += 10;
  if (d.contact.email) score += 5;
  if (d.contact.phone) score += 5;
  if (d.contact.location) score += 5;
  if (d.contact.linkedin) score += 5;
  score += Math.min(d.experience.length * 10, 30);
  score += Math.min(d.education.length * 5, 10);
  score += Math.min(d.skillGroups.flatMap((g) => g.skills).length * 2, 10);
  return Math.min(score, 100);
}

export default function CareerInsights({ resumes }: Props) {
  const totalExports = resumes.reduce((sum, r) => sum + r.exportCount, 0);
  const profileScore = computeProfileScore(resumes);
  const completeCount = resumes.filter((r) => r.status === "complete").length;

  return (
    <div className="space-y-4">
      <p className="font-sans text-xs uppercase tracking-[0.2em] text-text-subtle mb-4">
        Career Insights
      </p>

      {/* Total Exports */}
      <div className="bg-card border border-border rounded-lg p-5 shadow-sm">
        <p className="font-sans text-[10px] uppercase tracking-widest text-text-subtle mb-1">
          Total Exports
        </p>
        <p className="font-sans font-bold text-3xl text-foreground">
          {totalExports}
        </p>
        <p className="font-sans text-[10px] text-muted-foreground mt-1">PDFs</p>
      </div>

      {/* Profile Score */}
      <div className="bg-card border border-border rounded-lg p-5 shadow-sm">
        <p className="font-sans text-[10px] uppercase tracking-widest text-text-subtle mb-1">
          Profile Score
        </p>
        <p className="font-sans font-bold text-3xl text-foreground">
          {profileScore}%
        </p>
        {/* Progress bar */}
        <div className="mt-2 h-px bg-border rounded-full overflow-hidden">
          <div
            className="h-full bg-foreground rounded-full transition-all duration-700"
            style={{ width: `${profileScore}%` }}
          />
        </div>
      </div>

      {/* Active Goal */}
      <div className="bg-brand-secondary text-white rounded-lg p-5">
        <p className="font-sans text-[10px] uppercase tracking-widest opacity-60 mb-1">
          Completed Resumes
        </p>
        <p className="font-sans font-bold text-2xl">
          {completeCount} / {resumes.length}
        </p>
        <button className="font-sans text-[10px] uppercase tracking-widest mt-2 opacity-60 hover:opacity-100 transition-opacity">
          View Plan →
        </button>
      </div>
    </div>
  );
}
