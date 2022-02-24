import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class DataTableRequestDto {
  @IsNotEmpty()
  @IsNumber()
  public pageNumber: number;

  @IsNotEmpty()
  @IsNumber()
  public recordLength: number;

  @IsNotEmpty()
  public sort: Sorting[];

  @IsNotEmpty()
  public advanceSearch: AdvanceSearch[];
}

export class AdvanceSearch {
  @IsNotEmpty()
  @IsString()
  public key: string;

  @IsNotEmpty()
  @IsString()
  public column: string;

  @IsNotEmpty()
  @IsString()
  public condition: string;

  @IsNotEmpty()
  @IsString()
  public value: string;

  public multiValue: string[];
}

export class Sorting {
  @IsNotEmpty()
  @IsString()
  public sortColumn: string;

  @IsNotEmpty()
  @IsString()
  public sortAscending: string;
}
