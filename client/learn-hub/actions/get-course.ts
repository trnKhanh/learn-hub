export const getCourses = async () => {
    const courses = await fetch('http://localhost:4000/courses',{ cache: 'no-store' })
    return courses.json()
}
