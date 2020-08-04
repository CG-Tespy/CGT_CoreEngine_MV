export class BaseTexture
{
    width: number;
    height: number;

    static from(imageUrl: string) { return new this(imageUrl); }

    constructor(public imageUrl: string)
    {
        // Don't call the constructor with a string; only the "from"
        // method can do that
        this.width = 1;
        this.height = 1;
    }

    destroy() {}
}

export class Texture
{
    width: number = 1;
    height: number = 1;
    baseTexture: BaseTexture;

    static from(imageUrl: string) { return new this(imageUrl); }
    constructor(imageUrl: string)
    {
        // @ts-ignore
        this.baseTexture = new BaseTexture(imageUrl);
    }

    destroy() {}
}

export class Rectangle
{
    constructor(public width: number, public height: number) {}
}

export class Point
{
    constructor(x: number = 0, y: number = 0) {}
}

export class Sprite
{
    _texture: Texture;
    width: number = 1;
    height: number = 1;
    alpha: number = 1;

    get texture() { return this._texture; }
    set texture(value)
    {
        this._texture = value;
    }

    constructor(texture: Texture)
    {
        this.texture = texture;
    }
}

SetStatics();

function SetStatics()
{
    // @ts-ignore
    Texture.Null = Object.freeze(new Texture());
    // @ts-ignore
    BaseTexture.Null = Object.freeze(new BaseTexture());
    // @ts-ignore
    Sprite.Null = Object.freeze(new Sprite());
}