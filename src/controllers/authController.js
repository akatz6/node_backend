const { bcrypt, prisma, jwt } = require("../common/common");
const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });
  const match = await bcrypt.compare(password, user?.password);
  if (match) {
    const token = jwt.sign(
      {
        email,
      },
      process.env.WEB_TOKEN,
      { expiresIn: "1h" }
    );
    const obj = {
      user,
      token,
    };
    res.send(obj);
  } else {
    res.send("Something didn't work");
  }
};

const register = async (req, res) => {
  const { email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const registerUser = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });
  if (registerUser) {
    const token = jwt.sign(
      {
        email,
      },
      process.env.WEB_TOKEN,
      { expiresIn: "1h" }
    );
    const obj = {
      user,
      token,
    };
    res.json(obj);
  } else {
    res.send("Something didn't work");
  }
};

const users = async (req, res) => {
  const users = await prisma.user.findMany();
  if (users) {
    res.send(users);
  } else {
    res.send("Table is empty");
  }
};

const user = async (req, res) => {
  const id = Number(req.params.id);
  const { email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await prisma.user.findFirst({
    where: {
      id,
    },
  });
  try {
    if (user) {
      const updateUser = await prisma.user.update({
        where: {
          id,
        },
        data: {
          email,
          password: hashedPassword,
        },
      });
      if (updateUser) {
        res.send(updateUser);
        return;
      } else {
        res.send("User did not update");
        return;
      }
    } else {
      res.send("User not found");
      return;
    }
  } catch (e) {
    res.send(e);
    return;
  }

  res.send(user);
};

module.exports = {
  login,
  register,
  users,
  user,
};
