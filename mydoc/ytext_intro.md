
YText是一个文档编辑库，其核心包括两个部分：
1. 编辑器（Editor）：将用所见即所得的方式来编辑文档的中间表示；
2. 印刷器（Printer）：将文档的中间表示渲染成网页。

其中，『文档的中间表示』是YText表示文档的真正方式。其将文档组织成树，只保留**语义**信息，不包含**样式**或者**排版**信息。

# 中间表示的语法

一个文档的中间表示将文档组织成树，树上的非叶子节点有两种类型：
1. 段落节点（paragraph）；
2. 概念节点（concept），
   
而叶节点一定是文本节点（text）。其中，概念节点有四种类型：
1. 组（Group）；
2. 结构（Structure）；
3. 支撑（Support）；
4. 行内（Inline），

另外，节点本身可以包含若干新的树作为其属性（不是子树），这一类树的根节点本质上也是组，但是为了区分，称其为抽象（Abstract）节点。

一棵树的根节点一定是组节点，叶节点一定是文本节点。


任何一个概念节点有三种参数：
1. 参数（Parameters）：由概念定义，且在编辑过程中可以更改的参数；
2. 元参数（meta-parameters）：由概念定义，且在编辑过程中不可更改的参数；
3. 固有参数（inherent-parameters）：由**概念类型**定义，且在编辑过程中可以更改的参数。

## 概念

在YText中，有一种被称为『概念』的概念。大体上来说，概念对应于文档中的可辨认的一个部分（例如定理）。
一个概念的定义要包含以下几个部分：
1. 对应的特殊节点类型，以及对应的元参数（meta-parameters）取值；
2. 参数（parameters）列表原型，包括参数的默认值；
3. 这个节点的渲染方式，

可见，从概念开始，就需要定义如何渲染的问题了。

### 一级概念和二级概念

一级概念（first-concept）和二级概念（second-concept）是为了向实践妥协而区分出的概念。大体来说，我们一方面希望概念由文档自身定义，另一方面因为概念包含渲染等问题，我们不可能在文档里包含一段js程序用于描述渲染（更不用提定义如何渲染本身就是一个大工程），因此我们对概念分级。大体来说，一级概念是在安装时确定的，其所有实现都是在代码里硬编码的。而二级概念则将一个一级概念作为其属性，并定义如何重写（override）一级概念的参数列表。重写有两种方式：
1. 固定（Fix）：固定某个原先参数的值，使之不可改变；
2. 改变默认值（Change-Default）：改变某个原先参数的默认值，注意这一步中可以新增参数；

# 中间表示实现
接下来简述中间表示的具体实现。中间表示表示成一个json树。其中每个叶节点一定是一个文本节点。
```
interface TextNode {text: string}
```
表示一段文本。

而一个段落节点只能包含文本（text）节点和行内（inline）节点。
```
interface ParagraphNode {
	type: "paragraph"
	children: (Text | Inline) []
}
```

对于概念，之前说过，其需要有固有参数和元参数，元参数包括三个值：
1. 是否强制这个节点为行内（Inline）节点；
2. 是否强制这个节点为空（Void）节点；
3. 是否强制这个节点为块级（Block）节点：
```
Interface MetaParameters{
	forceInline?: boolean,
	forceBlock?: boolean,
	forceVoid?: boolean,
}
```
注意，元参数通常是用来对支撑节点进行补充说明的，因为支撑节点本身并不明确应该作为块级、行内还是空元素。其他特殊类型的节点，其类型本身给予了此类清晰，例如行内节点应该作为行内元素，组节点应该作为块级元素。但是对于其他特殊类型，也保留确定元参数的自由。

而概念的固有参数则和概念类型有关。在接下来的分类型实现中详述。

## 关于参数原型

注意，节点的参数是要参与编辑的，因此其不能是任意对象，只能是可以是基本类型，也就是字符串（string）、数字（number）和布尔值（boolean），但是对于fixed的参数，还可以是一个简单函数，用来表示这个参数的值由其他参数的值间接确定。
```
type ParameterValue = 
	{type: "string" , val: string} |
	{type: "number" , val: number} | 
	{type: "boolean" , val: boolean}
type FixedParameterValue = ParameterValue | {"type": "function" , val: string}

interface ParameterList{[key: string]: ParameterValue}
interface FixedParameterList{[key: string]: FixedParameterValue}
```
对于类型是函数的参数，其值应该是一个类似于这样的字符串：
```
"p=>p.x.val"
```
在解释时，会将整个节点的当前参数列表作为`p`传入。



## 行内概念节点的实现

一个行内概念节点只包含一段文本。但是如之前所说，作为一个特殊节点，其还有参数和抽象。注意一个概念节点不需要储存元参数，只需要储存其对应的一级概念名，而概念本身会确定元参数。另外，两级概念都有其参数列表，但是不需要一级概念的参数表，因为只需要二级概念的参数表就可以确定要一级概念的参数表。另外，二级概念的固定参数表也可以直接由二级概念本身确定，因此也不需要在节点中储存。

除此之外，每个概念节点还需要有一个全局唯一的编号，用来方便创建引用。

```
Interface InlineNode{
	type: "inline"
	idx: number 

	concept: string
	parameters: ParameterList

	children: [ Text ]
	abstrct: AbstractNode []
}
```

## 组概念节点的实现

一个组概念除了元参数和子节点之外，还包含一个固有属性『连系』（relation），表示其和前一个节点的关系。连系只有两种取值：贴贴（chaining）和分离（separate）。
```
interface GroupNode{
	type: "group"
	idx: number 

	concept: string
	parameters: ParameterList

	children: NonLeafNode []
	abstract: AbstractNode []

	relation: "chaining" | "separate"
}
```
其中`NonLeafNode = ParagraphNode | ConceptNode`，而`ConceptNode = GroupNode | InlineNode | StructNode | SupportNode`。

## 结构概念节点的实现

一个结构概念表示一个横向展开的展示，比如表格的一行，或者分栏等。一个文档的横向结构不像纵向结构那样可以自由发展，因为页面的宽度是恒定的。因此，需要明确指定其包含多少列。

另外，结构也可以贴贴，因此也有连系参数。

```
interface StructNode{
	type: "structure" 
	idx: number 

	concept: string
	parameters: ParameterList
	
	children: NonLeafNode []
	abstract: AbstractNode []

	numChildren: number
	relation: "chaining" | "separate"
}
```
其中，children的长度等于numChildren的长度。

## 支撑概念节点的实现

一个支撑概念通常是用来表示页面的导航、标注等的元素，不可编辑。

```
interface SupportNode{
	type: "support" 
	idx: number 

	concept: string
	parameters: ParameterList
	
	children: []
	abstract: AbstractNode []
}
```

## 抽象节点的实现

之前说过，一个抽象节点是一个新的文档树的初始节点。
```
interface AbstractNode{
	type: "abstract"
	idx: number 
	
	concept: string
	parameters: ParameterList
	
	children: NonLeafNode []
	abstract: AbstractNode []
}
```


# 印刷实现

接下来描述如何将一棵节点树渲染成一个页面。这其中包含两个部分，第一是从抽象的层面，每个概念需要定义哪些东西，第二是具体如何实现（比如如何确定字体、如何确定宽度等）。这里先明确第一部分，之后再详细描述第二个部分。

渲染器在渲染节点时，会维护两个量，一个是当前环境（env），一个是节点的上下文（context）。环境和上下文都是一般的字典。
```
type Env = any
type Context = any
```


渲染器会首先遍历整棵树若干次来建立context，然后再进行渲染。每次遍历都是深度优先的遍历，每次遍历时，节点需要检查环境和上下文，并进行一定的修改，然后返回是否完成，如果一次遍历中有节点未完成（比如需要后方节点的信息），那么就会进行第二次遍历，直到所有节点都完成或者达到次数上限为止。

在遍历时，每个节点需要定义两个函数，即进入时操作（enter）和离开时操作（exit）。
```
type PrinterEnterFunction = function enter(node: Node , env: Env , context: Context) => [env: Env , context: Context]

type PrinterExitFunction = function exit(node: Node , env: Env , context: Context) => [env: Env , context: Context , finished: boolean]
```
其中`enter`在进入节点时调用，`exit`在离开节点时调用。


所以，在所有遍历中，对于每个节点，会依次调用`enter`和`exit`函数若干次，每次调用中输出的context会作为下一个函数的context的输入，最后一个函数输出的context会作为渲染时的context。

在渲染阶段，需要每个节点提供一个React组件，这个组件接收之前遍历得到的context，并说明如何渲染。
```
type PrinterRenderFunction = function renderer({
	context: Context
	node: Node
	children: React.ReactElement
})
```
因此，一个完整的渲染器应包括以上三个函数。
```
interface PrinterRenderer{
	enter: PrinterEnterFunction
	exit: PrinterExitFunction
	renderer: PrinterRenderFunction
}
```

注意，虽然以上说明是对概念节点和抽象节点而言，但是对于段落节点，也提供一套完整的渲染器，而对于文本节点，要提供一个渲染函数（renderer）。


## （一级）概念实现

在说明了为了实现印刷，一个概念需要提供哪些东西后，就可以说明一个概念具体需要提供哪些东西了。如前所述，一个概念需要和一个概念类型对应、需要有一个全局唯一的名称以供索引、需要提供参数原型和元参数，并提供渲染的定义。
```
interface Concept{
	type: "group" | "inline" | "structure" | "support" | "abstract"
	name: string
	metaParameters: MetaParameters
	parameterPrototype: ParameterList
}
```

至于二级概念，实际上是对一级概念的重写，只需要指定一级概念的名称以及复写的参数列表就可以。
```
interface SecondConcept{
	firstConcept: string
	name: string
	defaultOverride: ParameterList
	fixedOverride: FixedParameterList
}
```
注意，在节点指定concept时，只需要指定二级概念。

# 关于编辑

编辑器和印刷器的实现是分离的，理论上用户可以使用YText提供的印刷器，自己实现编辑器，也可以反之使用YText提供的编辑器，自己实现印刷器。

目前的编辑器方案高度依赖slate，会在另一个文档里详述。我想实际上一个纯文本的编辑器也不是不可能。

