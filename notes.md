# Lean

Enabling the lean option tells Mongoose to skip instantiating a full Mongoose document and just give you the POJO.
Documents are much heavier than vanilla JavaScript objects, because they have a lot of internal state for change tracking.

**Example**
const leanDoc = await MyModel.findOne().lean();

**Downside of enabling lean is that lean docs don't have:**

```* Change tracking
   * Casting and validation
   * Getters and setters
   * Virtuals
   * save()
```

**Plugins**
Using lean() bypasses all Mongoose features, including virtuals, getters/setters, and defaults. If you want to use these features with lean(), you need to use the corresponding plugin:

* mongoose-lean-virtuals
* mongoose-lean-getters
* mongoose-lean-defaults

**Example**
const schema = new Schema({ name: String });
schema.plugin(require('mongoose-lean-virtuals'));
--------------------------------------------------------------------------------
# Populate
## Saving Refs
You can set the ref option on ObjectId, Number, String, and Buffer paths. populate() works with ObjectIds, numbers, strings, and buffers. 
However, we recommend using ObjectIds as _id properties (and thus ObjectIds for ref properties) unless you have a good reason not to.
That is because MongoDB will set _id to an ObjectId if you create a new document without an _id property, so if you make your _id property a Number, you need to be extra careful not to insert a document without a numeric _id.

## Checking Whether a Field is Populated
```
story.populated('author'); // truthy
story.depopulate('author'); // Make `author` not populated anymore
story.populated('author'); // undefined
```