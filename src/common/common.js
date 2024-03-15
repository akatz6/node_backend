const router = require("express").Router();
const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");

module.exports = { router, bcrypt, prisma, jwt };
