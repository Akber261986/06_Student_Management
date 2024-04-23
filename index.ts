#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation"

async function welcome() {      // This function is used to make a colorful preety Welcome
    const title = chalkAnimation.rainbow("\n\tWELCOM TO GHULAM AKBAR'S STUDENT MANAGEMENT SYSTEM")
    await new Promise((resolve) => {
        setTimeout(resolve, 3000);
    })
    title.stop()      // You can ignore line 6 to 11 its just for colorful welcome
    class student {
        Name: string
        Course: string
        Id: number
        Balance: number
        constructor(Name: string, Course: string, Id: number, Balance: number) {
            this.Name = Name
            this.Course = Course
            this.Id = Id
            this.Balance = Balance
        }

        public get studentName(): string {
            return this.Name
        }

        public get studentCourse(): string {
            return this.Course
        }

        public get studentId(): number {
            return this.Id
        }

        public get studentBalance(): number {
            return this.Balance
        }
    }
    type Data = {

        Student_Name: string
        Student_Course: string
        StudentId: number
        Student_Balance: number                     // a class to manage student data from user to output
    }
    //<==================================================================================================>

    let studentarray: any[] = [];                    // a blank arry to store student data from user
    let studentId = () => {
        return Math.floor(Math.random() * 1000) + 9999;  // making a unique student Id
    }
    let studentbalance = () => {
        return Math.floor(Math.random() * 1000) + 999;  // Randomly genrating balance 
    }

    let condition = true
    while (condition) {

        let enroll = await inquirer.prompt([
            {
                name: "q1",
                type: "list",
                message: chalk.blueBright("\nWhich Task Do you want to perform?"),
                choices: ["Add Student", "Check Status", "Exit"]
            }
        ])
        //<==================================================================>
        if (enroll.q1 === "Add Student") {
            let adding = await inquirer.prompt([
                {
                    name: "studentName",
                    type: "input",
                    message: chalk.blueBright("\nPlease Enter The Name of Student."),
                },
                {
                    name: "course",
                    type: "list",
                    message: chalk.blueBright("\nPlease Select a Course."),
                    choices: ["TypeScript", "React", "Next.js", "Python"]
                },
                // {
                //     name:"confirmation",
                //     type: "confirm",
                //     message: chalk.blueBright("\nDo You want to add more Student?"),
                //     default: true
                // }
            ])
            const add = new student(adding.studentName, adding.course, studentId(), studentbalance());
            studentarray.push(add);
            console.log(chalk.green("\nStudent Added Successfuly"));


        }
        //<==================================================================>

        else if (enroll.q1 === "Check Status") {

            if (studentarray.length > 0) {
                for (let i = 0; i < studentarray.length; i++) {

                    const studentData = studentarray[i]

                    console.log(chalk.bgCyan(chalk.black(`\nStudent No ${i + 1}\n`)));
                    console.log(chalk.rgb(146, 214, 36)(`Name:      ${studentData.studentName}`));
                    console.log(chalk.rgb(183, 101, 235)(`Course:    ${studentData.studentCourse}`));
                    console.log(chalk.cyanBright(`Balance:   $${studentData.studentBalance}`));
                    console.log(chalk.rgb(214, 45, 138)(`ID:        ${studentData.studentId}`));

                }

            }
            else {
                console.log(chalk.red(`\nThe list is Empity Please Add Students.\n`));

            }

        }
        //<==================================================================>
        else {
            let finish = await inquirer.prompt(
                {
                    name: "taskEnd",
                    type: "list",
                    message: chalk.blueBright("\nDo You Want to See the Student list Before Exit?"),
                    choices: ["Yes", "No"]
                })
            if (finish.taskEnd === "Yes") {
                for (let i = 0; i < studentarray.length; i++) {

                    const studentData = studentarray[i]

                    console.log(chalk.bgCyan(chalk.black(`\nStudent No ${i + 1}\n`)));
                    console.log(chalk.rgb(146, 214, 36)(`Name:      ${studentData.studentName}`));
                    console.log(chalk.rgb(183, 101, 235)(`Course:    ${studentData.studentCourse}`));
                    console.log(chalk.cyanBright(`Balance:   $${studentData.studentBalance}`));
                    console.log(chalk.rgb(214, 45, 138)(`ID:        ${studentData.studentId}`));

                }

                condition = false
            }
            else {

                condition = false
            }
        }
    }
}
welcome()