'use client'

import { ReactNode } from 'react'

interface FieldProps {
  label: string
  hint?: string
  children: ReactNode
  required?: boolean
}

export function Field({ label, hint, children, required }: FieldProps) {
  return (
    <div>
      <label className="block text-xs font-medium text-white/60 mb-1.5">
        {label}
        {required && <span className="text-[#F05B1B] ml-0.5">*</span>}
      </label>
      {children}
      {hint && <p className="text-white/25 text-[10px] mt-1">{hint}</p>}
    </div>
  )
}

const inputBase =
  'w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#F05B1B]/50 focus:bg-white/[0.06] transition-all duration-200'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  hint?: string
}
export function Input({ label, hint, required, ...props }: InputProps) {
  return (
    <Field label={label} hint={hint} required={required}>
      <input className={inputBase} {...props} />
    </Field>
  )
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  hint?: string
}
export function Textarea({ label, hint, required, ...props }: TextareaProps) {
  return (
    <Field label={label} hint={hint} required={required}>
      <textarea className={`${inputBase} resize-none`} rows={4} {...props} />
    </Field>
  )
}

interface GridProps {
  children: ReactNode
  cols?: 1 | 2 | 3
}
export function FieldGrid({ children, cols = 2 }: GridProps) {
  const colClass = cols === 3 ? 'grid-cols-3' : cols === 2 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'
  return <div className={`grid ${colClass} gap-4`}>{children}</div>
}
