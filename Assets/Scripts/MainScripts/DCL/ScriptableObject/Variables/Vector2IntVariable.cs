using UnityEngine;

[CreateAssetMenu(fileName = "Vector2IntVariable", menuName = "Vector2IntVariable")]
public class Vector2IntVariable : BaseVariable<Vector2Int>
{
    public void Set(Vector2 value)
    {
        base.Set(new Vector2Int((int)value.x, (int)value.y));
    }
}