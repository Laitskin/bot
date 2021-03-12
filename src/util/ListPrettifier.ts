interface ListableEntity {
  [key: string]: string | number | null | undefined;
}

export class ListPrettifier {
    private maxLength;
  prettify(dataset: ListableEntity[]): string {
    for (const datum of dataset) {
      console.log(`${datum.userName} - ${datum.peteputos}`);
    }

    return "return list here";
  }
}
