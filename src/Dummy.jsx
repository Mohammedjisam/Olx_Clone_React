import React from 'react'

function Dummy({name}) {
  return (
    <div>
      <span>{name?name:"component name is no defined"}</span>
    </div>
  )
}

export default Dummy

// import React from 'react'

// function Dummy({name}) {
//   return (
//     <div>
//       <span>{name?name:"user not logged-in"}</span>
//     </div>
//   )
// }

// export default Dummy




// import React, { useContext } from 'react'
// import { AuthContext } from './store/FirebaseContext'

// function Dummy() {
//   const {user}=useContext(AuthContext)
//   return (
//     <div>
//       <span>{user?user.displayName:"userNotFound"}</span>
//     </div>
//   )
// }

// export default Dummy



