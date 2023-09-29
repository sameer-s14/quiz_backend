import { Options } from "../database";
import { IOptions } from "./../interfaces/model.interface";

export class OptionsRepository {
  public createBulkOptions = (options: IOptions[]) => {
    return Options.insertMany(options);
  };

  public updateOptionsInBulk = async (
    options: (IOptions & { id?: string })[]
  ) => {
    if (options?.length) {
      const filteredOption = options?.filter(({ id }) => id);
      for (let option of filteredOption) {
        const { id, ...optionsData } = option;
        await Options.updateOne({ _id: option?.id }, optionsData);
      }
    }
  };

  public deleteOptionsByQuestionId = async (questionId: string) => {
    return Options.deleteMany({ questionId });
  };
}
