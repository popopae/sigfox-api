class ValidateHelper {
  public static isObjectEmptyNullUndefined(item: object): boolean {
    return item === undefined || item === null || Object.keys(item).length === 0 || JSON.stringify(item) === JSON.stringify({}) ? true : false;
  }

  public static isEmptyOrNullOrUndefined(item: any): boolean {
    return item === undefined || item === null || item.toString().trim() === '' ? true : false;
  }
}

export default ValidateHelper;
