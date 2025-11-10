// import React, { useState } from 'react';
// import { NotificationTemplate } from '../../../types/template';
// import { useAppTranslation } from '../../../hooks/translation/useTranslation';

// interface TemplateTabContentProps {
//   templates: NotificationTemplate[];
//   selectedTemplate: NotificationTemplate | null;
//   loading: boolean;
//   saving: boolean;
//   testing: boolean;
//   message: string;
//   isEditing: boolean;
//   isCreating: boolean;
//   testResult: string;
//   formData: Partial<NotificationTemplate>;
//   loadTemplates: () => void;
//   handleSelectTemplate: (template: NotificationTemplate) => void;
//   handleCreateNew: () => void;
//   handleEdit: () => void;
//   handleCancel: () => void;
//   handleSubmit: (e: React.FormEvent) => void;
//   handleDelete: (template: NotificationTemplate) => void;
//   handleToggleActivation: (template: NotificationTemplate) => void;
//   handleTestTemplate: () => void;
//   updateField: <K extends keyof NotificationTemplate>(field: K, value: NotificationTemplate[K]) => void;
// }

// export const TemplateTabContent: React.FC<TemplateTabContentProps> = (props) => {
//   const { t, ready } = useAppTranslation(['common', 'templates']);
//   const [duplicateCode, setDuplicateCode] = useState('');

//   if (!ready) {
//     return (
//       <div style={{
//         background: 'white',
//         padding: '30px',
//         borderRadius: '15px',
//         boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
//         textAlign: 'center'
//       }}>
//         <div>Chargement des traductions...</div>
//       </div>
//     );
//   }

//   if (props.loading) {
//     return (
//       <div style={{
//         background: 'white',
//         padding: '30px',
//         borderRadius: '15px',
//         boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
//         textAlign: 'center'
//       }}>
//         <div>{t('common:loading')}</div>
//       </div>
//     );
//   }

//   return (
//     <div style={{
//       display: 'grid',
//       gridTemplateColumns: '300px 1fr',
//       gap: '20px',
//       minHeight: '600px'
//     }}>
//       {/* Sidebar - Liste des templates */}
//       <div style={{
//         background: 'white',
//         padding: '20px',
//         borderRadius: '15px',
//         boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
//       }}>
//         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
//           <h3 style={{ fontSize: '18px', color: '#333', margin: 0 }}>
//             {t('templates:list.title')}
//           </h3>
//           <button
//             onClick={props.handleCreateNew}
//             style={{
//               background: '#10b981',
//               color: 'white',
//               padding: '8px 12px',
//               borderRadius: '8px',
//               border: 'none',
//               cursor: 'pointer',
//               fontSize: '14px',
//               fontWeight: '600'
//             }}
//           >
//             + {t('templates:list.new')}
//           </button>
//         </div>

//         <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
//           {props.templates.map(template => (
//             <div
//               key={template.id}
//               onClick={() => props.handleSelectTemplate(template)}
//               style={{
//                 padding: '12px',
//                 borderRadius: '8px',
//                 border: `2px solid ${
//                   props.selectedTemplate?.id === template.id ? '#3b82f6' : '#e5e7eb'
//                 }`,
//                 background: props.selectedTemplate?.id === template.id ? '#f0f9ff' : 'white',
//                 cursor: 'pointer',
//                 transition: 'all 0.2s'
//               }}
//             >
//               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
//                 <div style={{ flex: 1 }}>
//                   <div style={{ 
//                     fontWeight: '600', 
//                     color: template.actif ? '#333' : '#9ca3af',
//                     textDecoration: template.actif ? 'none' : 'line-through'
//                   }}>
//                     {template.libelle}
//                   </div>
//                   <div style={{ 
//                     fontSize: '12px', 
//                     color: '#6b7280',
//                     fontFamily: 'monospace'
//                   }}>
//                     {template.code}
//                   </div>
//                   <div style={{ fontSize: '12px', color: '#9ca3af' }}>
//                     {template.canal}
//                   </div>
//                 </div>
//                 <div style={{ 
//                   width: '8px', 
//                   height: '8px', 
//                   borderRadius: '50%',
//                   background: template.actif ? '#10b981' : '#ef4444',
//                   marginLeft: '8px'
//                 }} />
//               </div>
//             </div>
//           ))}

//           {props.templates.length === 0 && (
//             <div style={{ 
//               textAlign: 'center', 
//               color: '#6b7280', 
//               padding: '20px',
//               fontStyle: 'italic'
//             }}>
//               {t('templates:list.empty')}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Contenu principal - Détails/Édition */}
//       <div style={{
//         background: 'white',
//         padding: '30px',
//         borderRadius: '15px',
//         boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
//       }}>
//         {props.message && (
//           <div style={{
//             padding: '12px 16px',
//             borderRadius: '8px',
//             marginBottom: '20px',
//             background: props.message.includes('✅') ? '#d1fae5' : '#fee2e2',
//             color: props.message.includes('✅') ? '#065f46' : '#991b1b',
//             border: `1px solid ${props.message.includes('✅') ? '#a7f3d0' : '#fecaca'}`
//           }}>
//             {props.message}
//           </div>
//         )}

//         {!props.selectedTemplate && !props.isCreating ? (
//           <div style={{ textAlign: 'center', color: '#6b7280', padding: '40px' }}>
//             <h3 style={{ fontSize: '20px', marginBottom: '10px' }}>
//               {t('templates:details.noSelection')}
//             </h3>
//             <p>{t('templates:details.selectOrCreate')}</p>
//           </div>
//         ) : (
//           <>
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
//               <h2 style={{ fontSize: '24px', color: '#333', margin: 0 }}>
//                 {props.isCreating ? t('templates:details.createTitle') : 
//                  props.isEditing ? t('templates:details.editTitle') : 
//                  props.selectedTemplate?.libelle}
//               </h2>

//               {props.selectedTemplate && !props.isEditing && !props.isCreating && (
//                 <div style={{ display: 'flex', gap: '8px' }}>
//                   <button
//                     onClick={props.handleEdit}
//                     style={{
//                       background: '#3b82f6',
//                       color: 'white',
//                       padding: '8px 16px',
//                       borderRadius: '8px',
//                       border: 'none',
//                       cursor: 'pointer',
//                       fontSize: '14px'
//                     }}
//                   >
//                     ✏️ {t('common:edit')}
//                   </button>
//                   <button
//                     onClick={() => props.handleToggleActivation(props.selectedTemplate!)}
//                     style={{
//                       background: props.selectedTemplate.actif ? '#ef4444' : '#10b981',
//                       color: 'white',
//                       padding: '8px 16px',
//                       borderRadius: '8px',
//                       border: 'none',
//                       cursor: 'pointer',
//                       fontSize: '14px'
//                     }}
//                   >
//                     {props.selectedTemplate.actif ? '⏸️' : '▶️'} 
//                     {props.selectedTemplate.actif ? t('common:deactivate') : t('common:activate')}
//                   </button>
//                   <button
//                     onClick={() => props.handleDelete(props.selectedTemplate!)}
//                     style={{
//                       background: '#dc2626',
//                       color: 'white',
//                       padding: '8px 16px',
//                       borderRadius: '8px',
//                       border: 'none',
//                       cursor: 'pointer',
//                       fontSize: '14px'
//                     }}
//                   >
//                     🗑️ {t('common:delete')}
//                   </button>
//                 </div>
//               )}

//               {(props.isEditing || props.isCreating) && (
//                 <div style={{ display: 'flex', gap: '8px' }}>
//                   <button
//                     onClick={props.handleCancel}
//                     style={{
//                       background: '#6b7280',
//                       color: 'white',
//                       padding: '8px 16px',
//                       borderRadius: '8px',
//                       border: 'none',
//                       cursor: 'pointer',
//                       fontSize: '14px'
//                     }}
//                   >
//                     ❌ {t('common:cancel')}
//                   </button>
//                 </div>
//               )}
//             </div>

//             {/* Formulaire d'édition/création */}
//             {(props.isEditing || props.isCreating) ? (
//               <form onSubmit={props.handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
//                 <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
//                   <div>
//                     <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
//                       {t('templates:form.code')}:
//                     </label>
//                     <input
//                       type="text"
//                       value={props.formData.code || ''}
//                       onChange={(e) => props.updateField('code', e.target.value)}
//                       placeholder="CREATION_TICKET"
//                       style={{
//                         width: '100%',
//                         padding: '12px',
//                         borderRadius: '10px',
//                         border: '1px solid #ddd',
//                         fontSize: '16px',
//                         fontFamily: 'monospace'
//                       }}
//                       required
//                       disabled={!props.isCreating} // Le code n'est pas modifiable après création
//                     />
//                   </div>

//                   <div>
//                     <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
//                       {t('templates:form.canal')}:
//                     </label>
//                     <select
//                       value={props.formData.canal || 'EMAIL'}
//                       onChange={(e) => props.updateField('canal', e.target.value)}
//                       style={{
//                         width: '100%',
//                         padding: '12px',
//                         borderRadius: '10px',
//                         border: '1px solid #ddd',
//                         fontSize: '16px'
//                       }}
//                       required
//                     >
//                       <option value="EMAIL">Email</option>
//                       <option value="SMS">SMS</option>
//                       <option value="WHATSAPP">WhatsApp</option>
//                     </select>
//                   </div>
//                 </div>

//                 <div>
//                   <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
//                     {t('templates:form.libelle')}:
//                   </label>
//                   <input
//                     type="text"
//                     value={props.formData.libelle || ''}
//                     onChange={(e) => props.updateField('libelle', e.target.value)}
//                     placeholder={t('templates:form.libellePlaceholder')}
//                     style={{
//                       width: '100%',
//                       padding: '12px',
//                       borderRadius: '10px',
//                       border: '1px solid #ddd',
//                       fontSize: '16px'
//                     }}
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
//                     {t('templates:form.sujet')}:
//                   </label>
//                   <input
//                     type="text"
//                     value={props.formData.sujet || ''}
//                     onChange={(e) => props.updateField('sujet', e.target.value)}
//                     placeholder={t('templates:form.sujetPlaceholder')}
//                     style={{
//                       width: '100%',
//                       padding: '12px',
//                       borderRadius: '10px',
//                       border: '1px solid #ddd',
//                       fontSize: '16px'
//                     }}
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
//                     {t('templates:form.contenuHtml')}:
//                   </label>
//                   <textarea
//                     value={props.formData.contenuHtml || ''}
//                     onChange={(e) => props.updateField('contenuHtml', e.target.value)}
//                     placeholder={t('templates:form.contenuHtmlPlaceholder')}
//                     rows={12}
//                     style={{
//                       width: '100%',
//                       padding: '12px',
//                       borderRadius: '10px',
//                       border: '1px solid #ddd',
//                       fontSize: '16px',
//                       resize: 'vertical',
//                       fontFamily: 'monospace'
//                     }}
//                     required
//                   />
//                   <small style={{ color: '#666', fontSize: '14px', marginTop: '5px', display: 'block' }}>
//                     {t('templates:form.variablesHelp')}
//                   </small>
//                 </div>

//                 {props.isCreating && (
//                   <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
//                     <input
//                       type="checkbox"
//                       id="actif"
//                       checked={props.formData.actif || false}
//                       onChange={(e) => props.updateField('actif', e.target.checked)}
//                       style={{ width: '18px', height: '18px' }}
//                     />
//                     <label htmlFor="actif" style={{ fontWeight: '600', cursor: 'pointer' }}>
//                       {t('templates:form.active')}
//                     </label>
//                   </div>
//                 )}

//                 <div style={{ display: 'flex', gap: '12px' }}>
//                   <button
//                     type="submit"
//                     disabled={props.saving}
//                     style={{
//                       background: props.saving ? '#9ca3af' : '#10b981',
//                       color: 'white',
//                       padding: '12px 24px',
//                       borderRadius: '10px',
//                       border: 'none',
//                       cursor: props.saving ? 'not-allowed' : 'pointer',
//                       fontSize: '16px',
//                       fontWeight: '600'
//                     }}
//                   >
//                     {props.saving ? '⏳' : '💾'}
//                     {props.saving ? `${t('common:loading')}...` : t('common:save')}
//                   </button>
//                 </div>
//               </form>
//             ) : (
//               /* Affichage des détails */
//               props.selectedTemplate && (
//                 <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
//                   <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
//                     <div>
//                       <strong>{t('templates:details.code')}:</strong>
//                       <div style={{ 
//                         background: '#f3f4f6', 
//                         padding: '8px 12px', 
//                         borderRadius: '6px',
//                         marginTop: '4px',
//                         fontFamily: 'monospace'
//                       }}>
//                         {props.selectedTemplate.code}
//                       </div>
//                     </div>
//                     <div>
//                       <strong>{t('templates:details.canal')}:</strong>
//                       <div style={{ 
//                         background: '#f3f4f6', 
//                         padding: '8px 12px', 
//                         borderRadius: '6px',
//                         marginTop: '4px'
//                       }}>
//                         {props.selectedTemplate.canal}
//                       </div>
//                     </div>
//                   </div>

//                   <div>
//                     <strong>{t('templates:details.sujet')}:</strong>
//                     <div style={{ 
//                       background: '#f3f4f6', 
//                       padding: '12px', 
//                       borderRadius: '6px',
//                       marginTop: '4px'
//                     }}>
//                       {props.selectedTemplate.sujet}
//                     </div>
//                   </div>

//                   <div>
//                     <strong>{t('templates:details.contenuHtml')}:</strong>
//                     <div style={{ 
//                       background: '#f8f9fa', 
//                       padding: '12px', 
//                       borderRadius: '6px',
//                       marginTop: '4px',
//                       border: '1px solid #e9ecef',
//                       maxHeight: '300px',
//                       overflow: 'auto',
//                       fontFamily: 'monospace',
//                       fontSize: '14px',
//                       whiteSpace: 'pre-wrap'
//                     }}>
//                       {props.selectedTemplate.contenuHtml}
//                     </div>
//                   </div>

//                   <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
//                     <button
//                       onClick={props.handleTestTemplate}
//                       disabled={props.testing}
//                       style={{
//                         background: props.testing ? '#9ca3af' : '#3b82f6',
//                         color: 'white',
//                         padding: '12px 24px',
//                         borderRadius: '10px',
//                         border: 'none',
//                         cursor: props.testing ? 'not-allowed' : 'pointer',
//                         fontSize: '16px',
//                         fontWeight: '600'
//                       }}
//                     >
//                       {props.testing ? '⏳' : '🧪'}
//                       {props.testing ? `${t('common:loading')}...` : t('templates:details.test')}
//                     </button>

//                     <button
//                       onClick={props.loadTemplates}
//                       style={{
//                         background: '#6b7280',
//                         color: 'white',
//                         padding: '12px 24px',
//                         borderRadius: '10px',
//                         border: 'none',
//                         cursor: 'pointer',
//                         fontSize: '16px',
//                         fontWeight: '600'
//                       }}
//                     >
//                       🔄 {t('common:reload')}
//                     </button>
//                   </div>

//                   {/* Résultat du test */}
//                   {props.testResult && (
//                     <div>
//                       <strong>{t('templates:details.testResult')}:</strong>
//                       <div 
//                         style={{ 
//                           background: '#f8f9fa', 
//                           padding: '12px', 
//                           borderRadius: '6px',
//                           marginTop: '4px',
//                           border: '1px solid #e9ecef',
//                           maxHeight: '200px',
//                           overflow: 'auto'
//                         }}
//                         dangerouslySetInnerHTML={{ __html: props.testResult }}
//                       />
//                     </div>
//                   )}
//                 </div>
//               )
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };