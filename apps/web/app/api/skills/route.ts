import { skillSchema } from "@/modules/skills/skills.schema";

import { NextResponse, NextRequest } from "next/server";

import { createSkill } from "@/modules/skills/skills.repository";

export async function POST(req: NextRequest) {
    try {
        
       const object = await req.formData();

       const parsed = skillSchema.safeParse({
        name: object.get("name") ?? undefined,
        desc: object.get("desc") ?? undefined,
        downloadUrl: object.get("downloadUrl") ?? undefined,
       });
       if (!parsed.success) {
        return NextResponse.json({ error: parsed.error.errors }, { status: 400 });
       }

        console.log(parsed);

        return NextResponse.json({ data: {
            message: "Create skill success"
        } }, { status: 200 });

        // const skill = await createSkill(parsed.data);

        // return NextResponse.json({ data: skill }, { status: 200 });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json(
            { error: error.message || "Create skill failed" },
            { status: 500 },
        );
    }
}