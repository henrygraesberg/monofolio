// 0001 | import DOMPurify from "dompurify"
// 0002 | import Link from "@tiptap/extension-link"
// 0003 | import Underline from "@tiptap/extension-underline"
// 0004 | import { useEditor } from "@tiptap/react"
// 0005 | import StarterKit from "@tiptap/starter-kit"
// 0006 | import { RichTextEditor as MantineRichTextEditor } from "@mantine/tiptap"
// 0007 | 
// 0008 | type RichTextEditorProps = {
// 0009 |   value: string
// 0010 |   onChange: (value: string) => void
// 0011 | }
// 0012 | 
// 0013 | export const RichTextEditor = ({ value, onChange }: RichTextEditorProps) => {
// 0014 |   const editor = useEditor({
// 0015 |     extensions: [
// 0016 |       StarterKit,
// 0017 |       Underline,
// 0018 |       Link.configure({
// 0019 |         openOnClick: false,
// 0020 |         autolink: true,
// 0021 |       }),
// 0022 |     ],
// 0023 |     content: value,
// 0024 |     immediatelyRender: false,
// 0025 |     onUpdate: ({ editor: activeEditor }) => {
// 0026 |       const html = activeEditor.getHTML()
// 0027 |       onChange(DOMPurify.sanitize(html))
// 0028 |     },
// 0029 |   })
// 0030 | 
// 0031 |   return (
// 0032 |     <MantineRichTextEditor editor={editor}>
// 0033 |       <MantineRichTextEditor.Toolbar sticky stickyOffset={80}>
// 0034 |         <MantineRichTextEditor.ControlsGroup>
// 0035 |           <MantineRichTextEditor.Bold />
// 0036 |           <MantineRichTextEditor.Italic />
// 0037 |           <MantineRichTextEditor.Underline />
// 0038 |           <MantineRichTextEditor.Strikethrough />
// 0039 |           <MantineRichTextEditor.ClearFormatting />
// 0040 |         </MantineRichTextEditor.ControlsGroup>
// 0041 | 
// 0042 |         <MantineRichTextEditor.ControlsGroup>
// 0043 |           <MantineRichTextEditor.H1 />
// 0044 |           <MantineRichTextEditor.H2 />
// 0045 |           <MantineRichTextEditor.H3 />
// 0046 |           <MantineRichTextEditor.H4 />
// 0047 |         </MantineRichTextEditor.ControlsGroup>
// 0048 | 
// 0049 |         <MantineRichTextEditor.ControlsGroup>
// 0050 |           <MantineRichTextEditor.BulletList />
// 0051 |           <MantineRichTextEditor.OrderedList />
// 0052 |           <MantineRichTextEditor.Blockquote />
// 0053 |           <MantineRichTextEditor.Hr />
// 0054 |         </MantineRichTextEditor.ControlsGroup>
// 0055 | 
// 0056 |         <MantineRichTextEditor.ControlsGroup>
// 0057 |           <MantineRichTextEditor.Link />
// 0058 |           <MantineRichTextEditor.Unlink />
// 0059 |         </MantineRichTextEditor.ControlsGroup>
// 0060 | 
// 0061 |         <MantineRichTextEditor.ControlsGroup>
// 0062 |           <MantineRichTextEditor.Undo />
// 0063 |           <MantineRichTextEditor.Redo />
// 0064 |         </MantineRichTextEditor.ControlsGroup>
// 0065 |       </MantineRichTextEditor.Toolbar>
// 0066 | 
// 0067 |       <MantineRichTextEditor.Content className="min-h-40 [&_.tiptap]:min-h-36 [&_.tiptap_ul]:list-disc [&_.tiptap_ol]:list-decimal [&_.tiptap_ul]:pl-6 [&_.tiptap_ol]:pl-6 [&_.tiptap_li]:my-1" />
// 0068 |     </MantineRichTextEditor>
// 0069 |   )
// 0070 | }
