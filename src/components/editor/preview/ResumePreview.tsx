import { ResumeData } from "@/types/resume";
import PreviewHeader from "./PreviewHeader";
import PreviewExperience from "./PreviewExperience";
import PreviewEducation from "./PreviewEducation";
import PreviewSkills from "./PreviewSkills";
import PreviewProjects from "./PreviewProjects";

interface Props {
  data: ResumeData;
}

export default function ResumePreview({ data }: Props) {
  return (
    <div className="w-full h-full overflow-auto scrollbar-none bg-zinc-100 p-4">
      {/* A4-like paper */}
      <div
        className="bg-white mx-auto shadow-lg"
        style={{
          width: "210mm",
          minHeight: "297mm",
          padding: "16mm 18mm",
          fontFamily: "Georgia, 'Times New Roman', serif",
          transformOrigin: "top center",
        }}
      >
        <PreviewHeader data={data} />

        {data.sections.summary && data.summary && (
          <div className="mb-5">
            <h2 className="text-[9px] font-mono uppercase tracking-[0.2em] text-zinc-400 mb-2 pb-1 border-b border-zinc-100">
              Profile
            </h2>
            <p className="text-[10px] text-zinc-600 leading-relaxed">{data.summary}</p>
          </div>
        )}

        {data.sections.experience && (
          <PreviewExperience experience={data.experience} />
        )}
        {data.sections.education && (
          <PreviewEducation education={data.education} />
        )}
        {data.sections.skills && (
          <PreviewSkills skillGroups={data.skillGroups} />
        )}
        {data.sections.projects && (
          <PreviewProjects projects={data.projects} />
        )}
      </div>
    </div>
  );
}
