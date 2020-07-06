import { sequelize } from "../../database/models/index";
import { convertToPercentage } from "../../utils/helpers";

class Dashboard {
  static async getDashboardData(req, res, next) {
    const {
      params: { email }
    } = req;
    try {
      const dashboardData = await sequelize.query(
        `exec GetDashboardFromClient ${process.env.DATABASE2}, @Email='${email}'`
      );
      const salesLeadsCount = await sequelize.query(
        `SELECT COUNT(*) FROM SalesPipelines where createdBy='${email}'`
      );

      const response = dashboardData[0].map(data => {
        const obj = {
          NumberOfCustomers: data.NumberOfCustomers,
          InactiveCustomers: data.InactiveCustomers,
          ActiveCustomers: data.ActiveCustomers,
          ActiveLoanCount: data.ActiveLoanCount,
          TotalLoanAmount: data.TotalLoanAmount,
          ArreasCount: data.ArreasCount,
          ArrearsAmount: data.ArrearsAmount,
          LoansDueToday: data.LoansDueToday,
          LoansDueTodayAmount: data.LoansDueTodayAmount,
          DibursedCount: data.DibursedCount,
          RecruitedCount: data.RecruitedCount,
          PLCount: data.PLCount,
          PLAmount: data.PLAmount,
          NPLCount: data.NPLCount,
          NPLAmount: data.NPLAmount,
          Leads: salesLeadsCount[0][0][""]
        };
        let disbursedPercentage = convertToPercentage(data.DibursedCount, 250);
        let recruitedPercentage = convertToPercentage(data.RecruitedCount, 15);
        let totalLP = data.PLCount + data.NPLCount;
        let PLPercentage = convertToPercentage(data.PLCount, totalLP);
        let PAR = convertToPercentage(data.ArrearsAmount, data.TotalLoanAmount);
        obj.DisbursedPercentage = disbursedPercentage;
        obj.RecruitedPercentage = recruitedPercentage;
        obj.PLPercentage = PLPercentage;
        obj.PAR = PAR;
        return obj;
      });
      res.status(200).send({
        dashboardData: response[0]
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({ error });
    }
  }
}

export default Dashboard;
