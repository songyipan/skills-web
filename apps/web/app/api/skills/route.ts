import { skillSchema } from "@/modules/skills/skills.schema";

import { NextResponse, NextRequest } from "next/server";

import {
  createSkill,
  getSkillsByNameService,
  incrementSkillDownloadCountService,
} from "@/modules/skills/skills.service";

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

// 根据技能名称查询技能
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const name = searchParams.get("name");

    if (!name) {
      return NextResponse.json(
        { error: "Skill name is required" },
        { status: 400 },
      );
    }

    const skills = await getSkillsByNameService({ name });

    return NextResponse.json(
      {
        message: "Get skills success",
        data: skills,
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: error.message || "Get skills failed" },
      { status: 500 },
    );
  }
}

// 根据技能id增加下载量
export async function PATCH(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Skill id is required" },
        { status: 400 },
      );
    }

    const skill = await incrementSkillDownloadCountService({ id });

    return NextResponse.json(
      {
        message: "Increment skill download count success",
        data: skill,
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: error.message || "Increment skill download count failed" },
      { status: 500 },
    );
  }
}
