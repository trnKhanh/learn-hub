export const getCourses = async () => {
    const courses = await fetch('http://localhost:4000/courses')
    return courses.json()
}
