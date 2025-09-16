export function dataFactory({title})
{
    //checking id
    const id = (typeof crypto !== 'undefined' && crypto.randomUUID)?crypto.randomUUID(): `${Date.now()}-${Math.random().toString(16).slice(2)}`;

    //checking if title is empty or not
    if(typeof title !== 'string' || !title.trim())
    {
        throw new Error ("title is required")
    }

    const now = new Date().toISOString();

    return {
        id,
        title: title.trim(),
        tasks:[],
        created_at: now,
        updated_at: now,
        archived: false
    }
}

//updating timestamp
export function touch(entity)
{
    entity.updated_at = new Date().toISOString();
    return entity;
}


