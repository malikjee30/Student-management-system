#! /usr/bin/env node
    import inquirer from "inquirer";

    class Student{
    static counter = 10000;
    id: number;
    name: string;
    courses: string[];
    balance: number;
    
    constructor(name: string){
    this.id = Student.counter++;
    this.name = name;
    this.courses = []; //initialize an empty array for courses
    this.balance = 100;
    }
    //method to enroll a student in a course
    enroll_course(course: string){
    this.courses.push(course);
    }
    //method to view a student balance
    view_balance(){
        console.log(`balance for ${this.name} : $${this.balance}`);
    }
    //method to pay student fees
    pay_fees(amount: number){
        this.balance -= amount;
        console.log(`$${amount} Fees paid successfully for ${this.name}`);
        console.log(`Remaining Balance : $${this.balance}`);
        
    }
    //method to display student status
    show_status(){
        console.log(`ID: ${this.id}`);
        console.log(`Name: ${this.name}`);
        console.log(`Courses: ${this.courses}`);
        console.log(`Balance: ${this.balance}`);
    }
    
}
// defining a student manager class to manage student
        class Student_manager{
        students: Student[]

        constructor(){
        this.students = []
        }
    // method to add a new student
        add_student(name: string){
        let student = new Student(name);
        this.students.push(student);
        console.log(`student: ${name} added successfully. Student ID: ${student.id}`);
        }
    // method to enroll a student in a course
        enroll_student(student_id: number, course: string){
        let student = this.find_student(student_id);
        if(student){
        student.enroll_course(course);
        console.log(`${student.name} enrolled in ${course} successfully`);
            }
        }
        // method to view a student balance
        view_student_balance(student_id: number){
        let student = this.find_student(student_id);
        if(student){
        student.view_balance();
            }
        else{
        console.log("Student not found.Please Enter correct student ID");
                
            }
         }
          // method to pay student fees
        pay_student_fees(student_id: number, amount: number){
        let student = this.find_student(student_id);
        if(student){
        student.pay_fees(amount);
            } 
        else{
        console.log("Student not found.Please Enter correct ID"); 
        }
        }
          //method display students status
        show_students_status(student_id: number){
        let student = this.find_student(student_id);
        if(student){
                student.show_status();
            }
          }

         // method to find a student by student_id
        find_student(student_id: number){
        return this.students.find(std => std.id === student_id); 
         }
       }
   //  Main function to run the program
        async function main(){
        console.log("Welcome to 'Ghulam Nasir' - Student Management System");
        console.log("-".repeat(55));

        let student_manager = new Student_manager();
     
   // while loop to keep program running
        while(true){
        let choice = await inquirer.prompt([
        {
            name: "choice",
            type: "list",
            message: "Select an option",
            choices: [
                "Add Student",
                "Enroll Student",
                "View Student Balance",
                "Pay Fees",
                "Show Status",
                "Exit"
            ]
        }
       ]);
    //using switch case to handle user choice
        switch(choice.choice){
            case "Add Student":
                let name_input = await inquirer.prompt([
                    {
                        name: "name",
                        type: "input",
                        message: "Enter a Student name"
                    }
                ]);
                student_manager.add_student(name_input.name);
                break;
            case "Enroll Student":
                let course_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a Student ID",
                    },
                    {
                        name: "course",
                        type: "input",
                        message: "Enter a course Name",
                    }
                ]);
                student_manager.enroll_student(course_input.student_id, course_input.course);
                break;
            case "View Student Balance":
        
                let balance_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a Student ID",
                    }
                ]);
                student_manager.view_student_balance(balance_input.student_id);
                break;
            case "Pay Fees":
                let fees_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a Student ID",
                    },
                    {
                        name: "amount",
                        type: "number",
                        message: "Enter the Amount to Pay",
                    }
                ]);
                student_manager.pay_student_fees(fees_input.student_id, fees_input.amount);
                break;
            case "Show Status":
                let status_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a Student ID",
                    }
                ]);
                student_manager.show_students_status(status_input.student_id);
                break;
            case "Exit":
                 console.log("Exiting...");
                 process.exit();
                    }
                }
           }
       // Calling a main function
            main();


    
