import bcrypt from 'bcryptjs';

const users = [
	{
		name: 'Kenny',
		email: 'zongxi2014@gmail.com',
		password: bcrypt.hashSync('123456', 10),
		isAdmin: true,
	},
	{
		name: 'Anthony',
		email: '985747018sch@gmail.com',
		password: bcrypt.hashSync('123456', 10),
		isAdmin: true,
	},
];

export default users;
