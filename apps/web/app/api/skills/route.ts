import { skillSchema } from "@/modules/skills/skills.schema";

import { NextResponse, NextRequest } from "next/server";

import { createSkill } from "@/modules/skills/skills.service";

export async function POST(req: NextRequest) {
  try {
    const object = await req.formData();

    const parsed = skillSchema.safeParse({
      name: object.get("name") ?? undefined,
      desc: object.get("desc") ?? undefined,
      downloadUrl: object.get("downloadUrl") ?? undefined,
      apiKey: object.get("apiKey") ?? undefined,
      mainContent: object.get("mainContent") ?? undefined,
    });
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Parse skill schema failed" },
        { status: 400 },
      );
    }

    const skill = await createSkill({
      ...parsed.data,
    });

    return NextResponse.json(
      {
        message: "Create skill success",
        data: skill,
      },
      { status: 200 },
    );

    // return NextResponse.json({ data: skill }, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: error.message || "Create skill failed" },
      { status: 500 },
    );
  }
}
