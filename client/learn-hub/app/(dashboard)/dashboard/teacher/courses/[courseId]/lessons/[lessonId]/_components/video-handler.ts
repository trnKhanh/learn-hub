import Mux from '@mux/mux-node';

const { Video } = new Mux(
    process.env.MUX_TOKEN_ID!,
    process.env.MUX_TOKEN_SECRET!,
);

export const uploadVideo = async (file_path : string, course_id : string, lesson_id : string) => {
    const asset = await Video.Assets.create({
        input: file_path,
        playback_policy: "public",
        test: false,
    });

    try {
        /*const res = await fetch(`http://localhost:3001/admins`, {
            credentials: "include",
        });
        const data: { message: string; admins: Admin[] } = await res.json();

        return { status: res.status, data: data };*/
    } catch (err) {

    }
}