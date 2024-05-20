
export type Guardian = {

    fatherName: string;
    fatherOccupation: string;
    fatherContactNo: string;
    motherName: string;
    motherOccupation: string;
    motherContactNo: string;
}

export type LocalGuardian = {

    name: string;
    occupation: string;
    address: string;
}


export type UserName = {
    firstName: string;
    middleName: string;
    lastName: string
};

export type Student = {
    id: string;
    name: UserName;
    roll: number;
    department: string;
    semester: string;
    group: string;
    gender: "male" | "female";
    contactNo: string;
    email: string;
    bloodGroup?: "A+" | "A-" | "B+" | "B-" | "O+" | "O-" | "AB+" | "AB-";
    presentAddress: string;
    permanentAddress: string;
    guardian: Guardian;
    localGuardian: LocalGuardian;
    profileImg?: string;
    isActive: 'active' | "inActive";
}