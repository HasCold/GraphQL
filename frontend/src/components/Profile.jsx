
const Profile = () => {
  return (
    <div className='container my-container'>
        <div className="center-align">
            {/* Use of this website for robot image :- https://robohash.org/ */}
        <img 
        className="circle"
        style={{border: "2px solid black", marginTop: "10px"}}
        src="https://robohash.org/hasan.png?size=200x200"
        />
            <h5>Hasan</h5>
            <h6>Email - test@gmail.com</h6>
        </div>
        <h3>Your Quotes</h3>
        <blockquote>
            <h6>If it works dont touch it</h6>
        </blockquote>
        <blockquote>
            <h6>If it works dont touch it</h6>
        </blockquote>
    </div>
  )
}

export default Profile