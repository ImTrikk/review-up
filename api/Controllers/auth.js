export const login = async (req, res) => {
 try {
  const { email, password } = req.body;

  

 } catch (err) {
  console.log(err);
 }
};

export const signin = async (req, res) => {
 try {
  const { firstName, lastName, email, phone, password } = req.body;
 } catch (err) {
  console.log(err);
 }
};
