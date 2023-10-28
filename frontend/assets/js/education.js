



const func = (className, subject) => {
    localStorage.setItem("className", className)
    localStorage.setItem("subject", [subject])
    location.href = 'buyCourse.html'
}


const education = (data) => {
    // localStorage.clear()
    localStorage.setItem("className", data)
    localStorage.setItem("subject", ["Arts", "Commerce", "Science"])
    location.href = 'higherEducation.html'

}