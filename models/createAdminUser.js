const express = require('express')
const bcrypt = require('bcrypt');
const User = require('./user')

const app = express()

async function createAdminUser(){
    try{
        const adminAadhar = process.env.ADMIN_AADHAR;
        const adminPassword = process.env.ADMIN_PASSWORD;
        const adminEmail = process.env.ADMIN_EMAIL;

        const existingAdmin = await User.findOne({aadharCardNumber: adminAadhar});

        if(!existingAdmin){
            const hashedPassword = await bcrypt.hash(adminPassword, 10);

            const newAdmin = new User({
                name: 'Satyam Kakra',
                age: 30, // Provide default age
                email: adminEmail,
                mobile: '9876543210', // Default mobile
                address: 'Admin Address', // Default address
                role: 'admin',
                aadharCardNumber : adminAadhar,
                password : hashedPassword,

            });
            await newAdmin.save();
            console.log('Admin user created successfully');
        } else {
            console.log('Admin user already exist');
        }

    }catch(err){
        console.log('Error creating admin user', err);
    }
}


module.exports = createAdminUser;