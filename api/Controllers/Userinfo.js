import { dbConnection } from "../Database/database.js"

export const Userinfo = async(req,res) => {

 const { email} = req.body

 try {
 
  const user = await dbConnection.query(`select * from users where email = $1`, [email])

  if (user.rows.length === 0) {
   return res.status(400).json({message: "User does not exist"})
  }

  const foundUser = user.rows[0]

  return res.status(200).json({foundUser, message: "Founder user"})

 } catch(err){
  console.log(err)
  return res.status(500).json({message: "Internal server error"})
 }
}