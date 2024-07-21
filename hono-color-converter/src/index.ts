import { Hono } from 'hono';
import { keyword } from 'color-convert';
import { KEYWORD } from 'color-convert/conversions';
import { cors } from 'hono/cors';

const app = new Hono();

app.use(cors({
  origin:  "*",
  credentials: true,
}));

app.get("/", (ctx) => {
  return ctx.text(
    "This is a simple color converter. Use the /colorformat/colorname structure"
  );
});

app.get("/:colorformat/:colorname", (ctx) => {
  const colorname: KEYWORD = ctx.req.param("colorname") as KEYWORD;
  const colorformat: string = ctx.req.param("colorformat");

  if (colorformat === "hex") {
    return ctx.text("#" + keyword.hex(colorname));
  }

  if (colorformat === "rgb") {
    return ctx.text("RGB: " + keyword.rgb(colorname).toString());
  }

  return ctx.text("Specify correct color name and color format");
});

export default app;
