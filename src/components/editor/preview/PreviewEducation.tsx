import { EducationEntry } from "@/types/resume";
import { formatMonthYear } from "@/lib/utils";

interface Props {
  education: EducationEntry[];
}

export default function PreviewEducation({ education }: Props) {
  if (education.length === 0) return null;

  return (
    <div className="mb-5">
      <h2 className="text-[9px] font-mono uppercase tracking-[0.2em] text-zinc-400 mb-2 pb-1 border-b border-zinc-100">
        Education
      </h2>
      <div className="space-y-3">
        {education.map((edu) => (
          <div key={edu.id} className="flex justify-between items-start">
            <div>
              <p className="text-[11px] font-bold text-zinc-800">{edu.school}</p>
              <p className="text-[9px] text-zinc-500">
                {[edu.degree, edu.field].filter(Boolean).join(" · ")}
                {edu.gpa ? ` · GPA ${edu.gpa}` : ""}
              </p>
            </div>
            <span className="text-[8px] text-zinc-400 font-mono whitespace-nowrap">
              {formatMonthYear(edu.startDate)} – {formatMonthYear(edu.endDate)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
