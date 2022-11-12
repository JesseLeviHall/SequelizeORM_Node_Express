/* 
Course on Sequelize ORM for node.js and express. 
ORM stands for Object Relational Mapping.
ORM is a technique that lets you query and manipulate data from a relational database using an object-oriented paradigm.
Sequelize is a promise-based ORM for Node.js v4 and up. It supports the dialects PostgreSQL, MySQL, SQLite and MSSQL and features solid transaction support, relations, read replication and more.

there are two ways to construct a model. Class based or function based. Class worked better for me. 

Class based: 
const { Model } = require('sequelize');
class User extends Model {}
User.init(attributes, options);

Function based:
const User = sequelize.define('User', attributes, options); 

The init method is used to define the model's attributes.
The define method is used to define the model's name and its attributes.

The init method takes two arguments: attributes and options.
The attributes argument is an object, where each attribute is a property of the object. Each attribute can be either a DataType, a string or a type description object, with the properties type, allowNull and defaultValue. The options argument is an object, with possible properties described below.

The define method takes three arguments: name, attributes and options.
The name argument is the name of the model. The attributes argument is an object, where each attribute is a property of the object. The options argument is an object, with possible properties described below.

*/
