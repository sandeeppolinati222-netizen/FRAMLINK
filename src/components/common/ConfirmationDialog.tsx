import React from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { AlertCircle, CheckCircle, Info } from 'lucide-react';

interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'danger' | 'primary' | 'warning';
  loading?: boolean;
}

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'primary',
  loading = false,
}) => {
  const icon = variant === 'danger' ? (
    <div className="w-10 h-10 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 mb-3">
      <AlertCircle className="w-6 h-6" />
    </div>
  ) : (
    <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 mb-3">
      <CheckCircle className="w-6 h-6" />
    </div>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} maxWidth="sm">
      <div className="flex flex-col items-center text-center">
        {icon}
        <p className="text-sm text-stone-600 leading-relaxed">{message}</p>
        
        <div className="flex items-center justify-end gap-3 mt-6 w-full pt-4 border-t border-stone-100">
          <Button variant="outline" size="md" onClick={onClose} disabled={loading} className="w-full">
            {cancelLabel}
          </Button>
          <Button
            variant={variant === 'danger' ? 'danger' : 'primary'}
            size="md"
            onClick={onConfirm}
            loading={loading}
            className="w-full"
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export const EmptyState: React.FC<{
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}> = ({ title, description, actionLabel, onAction, icon }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center bg-stone-50/60 rounded-xl border border-dashed border-stone-300">
      <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 mb-3">
        {icon || <Info className="w-6 h-6" />}
      </div>
      <h4 className="text-base font-medium text-stone-900">{title}</h4>
      <p className="text-sm text-stone-500 max-w-sm mt-1">{description}</p>
      {actionLabel && onAction && (
        <div className="mt-4">
          <Button size="sm" onClick={onAction}>{actionLabel}</Button>
        </div>
      )}
    </div>
  );
};

export const LoadingState: React.FC<{ text?: string }> = ({ text = 'Loading...' }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-8 h-8 border-3 border-emerald-700/20 border-t-emerald-800 rounded-full animate-spin"></div>
      <p className="text-xs font-medium text-stone-500 mt-3 font-mono">{text}</p>
    </div>
  );
};
