import { FaCaretDown } from "react-icons/fa6";

const BuyerHomeEarningsTable = ({ TableHeadings, TableRowData }) => {
  return (
    <div>
      <table className="min-w-full border-separate border-spacing-y-5 ">
        <thead>
          <tr>
            {TableHeadings.map((heading, index) => (
              <th key={index}>
                <h1 className="flex items-end font-medium text-[#696969] text-[12px] opacity-70">
                  {heading}
                  <FaCaretDown className="ml-2" />
                </h1>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className=" ">
          {TableRowData.map((RowData, index) => {
            return (
              <tr
                key={index}
                className="rounded-lg text-[14px] text-[#2C2C2C] bg-white "
              >
                <td className="px-4  ">
                  <h1 className="">{RowData?._id}</h1>
                </td>
                <td className="py-5">{RowData?.Service}</td>
                {RowData?.workerTrackCount != null && (
                  <td className="py-5">{`${RowData?.workerTrackCount}%`}</td>
                )}
                {RowData?.Amount && (
                  <td className="py-5">{"$" + RowData?.Amount}</td>
                )}
                {RowData?.platform && (
                  <td className="py-5">{RowData?.platform}</td>
                )}
                <td className="py-5">
                  {RowData?.Status && (
                    <div
                      className={
                        "w-fit rounded-full " +
                        (RowData.Status == "Complete"
                          ? "bg-[#E1FFDC]"
                          : "bg-[#FFF5DC]")
                      }
                    >
                      <h1
                        className={
                          "capitalize px-8 py-1 " +
                          (RowData.Status == "Complete"
                            ? "text-[#07A104] "
                            : "text-[#E2B102]")
                        }
                      >
                        {RowData.Status === "Complete" ? "Complete" : "Pending"}
                      </h1>
                    </div>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default BuyerHomeEarningsTable;
