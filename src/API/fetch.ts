export interface TagData {
  TagNumber: number;
  TagName: string;
  Units: string;
  Status: number;
  TimeStamp: string[]; // Or: Date[] if you parse them
  Value: number[];
  Confidence: number[];
  Sequence: number[];
}

export function emptyTagData(): TagData {
  return {
    TagNumber: 0,
    TagName: "",
    Units: "",
    Status: -1,
    TimeStamp: [],
    Value: [],
    Confidence: [],
    Sequence: [],
  };
}
//fetchTagNames(listPoints, "Now", 10, 50),
export async function fetchTagNames(
  tagname: string[],
  range: string,
  interval: number,
  rowCount: number
): Promise<TagData[]> {
  const url = "https://phd.miftachuda.my.id/GetData";

  const headers = {
    "Content-Type": "application/json",
    // "cf-access-client-id": "//5426b308354cefc398964c8d6286b4b1.access",
    // "cf-access-client-secret":
    //   "//d078417d60eeb52a6d3933ef66fbdcf2696a9d0d877451bd0c2d56d9892d01a3",
  };

  const body = JSON.stringify([
    {
      SampleInterval: interval * 1000,
      GetEnum: false,
      ResampleMethod: "Natural", //"Interpolated""Natural""Around""Before""After"
      MinimumConfidence: 0,
      MaxRows: rowCount,
      TimeFormat: 6,
      ReductionData: "snapshot",
      TagName: tagname,
      StartTime: range,
      EndTime: "Now",
      OutputTimeFormat: 6,
      EventSequence: 0,
    },
  ]);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers,
      body,
    });

    if (response.ok) {
      const data = await response.json();
      return parseTagDataList(data);
    } else {
      return [emptyTagData()];
    }
  } catch (error) {
    console.error("Fetch error:", error);
    return [emptyTagData()];
  }
}

function parseTagDataList(data: unknown): TagData[] {
  // You can optionally validate the structure here
  if (Array.isArray(data)) {
    return data as TagData[];
  } else {
    console.warn("Unexpected data format:", data);
    return [emptyTagData()];
  }
}

export function getValueByTag(tag: string, datas: TagData[]): number {
  const tagsearch = datas.find(
    (t) => t.TagName.toLocaleLowerCase() === tag.toLocaleLowerCase()
  );

  if (tagsearch && tagsearch.Value.length > 0) {
    const lastValue = tagsearch.Value[tagsearch.Value.length - 1];
    console.log(`Last value for ${tag}:`, lastValue);
    return lastValue;
  } else {
    console.log("Tag not found or no values available.");
    return 0;
  }
}

export function getValuesByTag(tag: string, datas: TagData[]): number[] {
  const tagsearch = datas.find(
    (t) => t.TagName.toLocaleLowerCase() === tag.toLocaleLowerCase()
  );

  if (tagsearch && tagsearch.Value.length > 0) {
    return tagsearch.Value;
  } else {
    console.log("Tag not found or no values available.");
    return [];
  }
}

export default fetchTagNames;
