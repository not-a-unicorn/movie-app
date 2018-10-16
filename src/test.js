var student = {
  name: "Theepan",
  work: "RMS",
  DOB: 1985,
  Sex: "M"
};

const { work,DOB, ...restStudent } = student;
console.log(restStudent);
