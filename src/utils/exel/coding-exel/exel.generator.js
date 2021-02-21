const chalk = require('chalk');
const excelJS = require('exceljs');

async function excel(dataEmpleado, fileName) {
  try {
    const workbook = new excelJS.Workbook();
    const workSheet = workbook.addWorksheet('My_users');

    workSheet.columns = [
      { header: 's.no', key: 's_no', width: 15 },
      { header: 'Name', key: 'Name', width: 15 },
      { header: 'stall', key: 'Stall', width: 15 },
      { header: 'department', key: 'Department', width: 15 },
      { header: 'business', key: 'Business', width: 15 },
    ];

    let count = 1;
    dataEmpleado.forEach((user) => {
      user.s_no = count;
      console.log('user', user);
      workSheet.addRow(user);
      count += 1;
    });
    workSheet.getRow(1).eachCell((cell) => {
      cell.font = { bold: true };
    });

    const data = await workbook.xlsx.writeFile(`./src/utils/exel/generatorExel/${fileName}.xlsx`);
    console.log(chalk.greenBright('DONE EXCEL.'));
  } catch (e) {
    console.log('Error', e);
  }
}

module.exports = {
  excel,
};
