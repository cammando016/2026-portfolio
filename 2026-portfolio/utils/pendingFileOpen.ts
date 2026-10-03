let pendingKey: string | null = null;

export const setPendingFileOpen = (key : string) => { pendingKey = key; };

export const consumePendingFileOpen = () : string | null => {
    const key = pendingKey;
    pendingKey = null;
    return key;
}