import { ResumeData } from "@/types/resume";
import PreviewHeader from "./PreviewHeader";
import PreviewExperience from "./PreviewExperience";
import PreviewEducation from "./PreviewEducation";
import PreviewSkills from "./PreviewSkills";
import PreviewProjects from "./PreviewProjects";

const DEFAULT_ORDER = [
  "experience",
  "education",
  "skills",
  "projects",
  "summary",
];

interface Props {
  data: ResumeData;
}

export default function ResumePreview({ data }: Props) {
  const order = data.sectionOrder?.length ? data.sectionOrder : DEFAULT_ORDER;

  return (
    <div className="w-full h-full overflow-auto scrollbar-none bg-zinc-100 p-4">
      {/* A4-like paper */}
      <div
        className="bg-white mx-auto shadow-lg"
        style={{
          width: "210mm",
          minHeight: "297mm",
          padding: "16mm 18mm",
          fontFamily: "Helvetica",
          transformOrigin: "top center",
        }}
      >
        <PreviewHeader data={data} />
        {order.map((id) => {
          if (id === "summary" && data.sections.summary && data.summary)
            return (
              <div key={id} className="mb-5">
                <h2 className="text-[9px] font-mono uppercase tracking-[0.2em] text-zinc-400 mb-2 pb-1 border-b border-zinc-100">
                  Profile
                </h2>
                <p className="text-[10px] text-zinc-600 leading-relaxed">
                  {data.summary}
                </p>
              </div>
            );
          if (id === "experience" && data.sections.experience)
            return <PreviewExperience key={id} experience={data.experience} />;
          if (id === "education" && data.sections.education)
            return <PreviewEducation key={id} education={data.education} />;
          if (id === "skills" && data.sections.skills)
            return <PreviewSkills key={id} skillGroups={data.skillGroups} />;
          if (id === "projects" && data.sections.projects)
            return <PreviewProjects key={id} projects={data.projects} />;
          return null;
        })}
      </div>
    </div>
  );
}
