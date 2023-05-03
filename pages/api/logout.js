import { serialize } from 'cookie';

const handler = async (req, res) => {
  if (req.method === 'GET') {
    try {
      // clear the access_token cookie
      res.setHeader('Set-Cookie', serialize('access_token', '', {
        httpOnly: true,
        sameSite: 'strict',
        expires: new Date(0),
        path: '/',
      }));

      // return a response indicating successful logout
      return res.json({ success: true, msg: 'Logout Successful' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success: false, msg: 'Internal Server Error' });
    }
  }
};

export default handler;
