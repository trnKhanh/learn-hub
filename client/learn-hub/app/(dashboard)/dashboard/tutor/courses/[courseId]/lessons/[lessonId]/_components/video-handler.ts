import Mux from '@mux/mux-node';

const { Video } = new Mux(
    process.env.MUX_TOKEN_ID!,
    process.env.MUX_TOKEN_SECRET!,
);

export const uploadVideo = async (file_path : string, course_id : string | undefined, lesson_id : string | undefined, assetId: string | undefined) => {
    if (assetId !== undefined) {
        await Video.Assets.del(assetId);
    }
    
    const asset = await Video.Assets.create({
        input: file_path,
        playback_policy: "public",
        test: false,
    });

    try {
        const res = await fetch(`http://localhost:3001/courses/${course_id}/lessons/${lesson_id}`, {
            credentials: "include",
            method: "PATCH",
            body: JSON.stringify({
                assetId: asset.id,
                playbackId: asset.playback_ids?.[0]?.id,
            }),
            headers: new Headers({
                "content-type": "application/json",
            }),
        });
        const data: { message: string; lesson: Lesson } = await res.json();
    
        return { status: res.status, data: data };
    } catch (err) {
        console.error(err);
        return null;
    }
}