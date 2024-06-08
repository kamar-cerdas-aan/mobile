import { dataModel } from "@/model/data";

export function groupByDate(data: dataModel[]): { key: string; data: dataModel[] }[] {
    const groupedData: { [key: string]: dataModel[] } = {};
  
    data.forEach((item) => {
      const dateKey = item.timestamp.toDateString();
  
      if (!groupedData[dateKey]) {
        groupedData[dateKey] = [];
      }
  
      groupedData[dateKey].push(item);
    });
  
    return Object.keys(groupedData).map((dateKey) => ({
      key: dateKey,
      data: groupedData[dateKey],
    }));
  }
  