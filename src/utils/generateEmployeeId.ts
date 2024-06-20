function generateEmployeeId(): string {
  // Generate a random 6-digit number
  const uniqueNumber = Math.floor(100000 + Math.random() * 900000);

  // Get the current year
  const currentYear = new Date().getFullYear();

  // Combine the parts to form the employee ID
  const employeeId = `INT-${currentYear}${uniqueNumber}`;

  return employeeId;
}

export default generateEmployeeId;
