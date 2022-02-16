import ValidateHelper from './validateHelper';

class CommonHelper {
  public static convertStringToEmpty(item: string): string {
    return ValidateHelper.isEmptyOrNullOrUndefined(item) ? '' : item;
  }

  public static convertNumberToEmpty(item: number): number {
    return ValidateHelper.isEmptyOrNullOrUndefined(item) ? 0 : item;
  }
}

export default CommonHelper;
