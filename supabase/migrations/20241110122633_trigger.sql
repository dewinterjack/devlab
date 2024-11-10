DO $$
DECLARE
  supabase_functions_url TEXT;
  supabase_public_key TEXT;
BEGIN
  SELECT decrypted_secret
  INTO supabase_functions_url
  FROM vault.decrypted_secrets
  WHERE name = 'SUPABASE_FUNCTIONS_URL';

  SELECT decrypted_secret
  INTO supabase_public_key
  FROM vault.decrypted_secrets
  WHERE name = 'SUPABASE_PUBLIC_KEY';

  EXECUTE format(
    'CREATE TRIGGER "New Repo" ' ||
    'AFTER INSERT ON public.devlab_repo ' ||
    'FOR EACH ROW EXECUTE FUNCTION supabase_functions.http_request( ' ||
    '''%s/trigger'', ' ||
    '''POST'', ' ||
    '''{"Content-type":"application/json","Authorization":"Bearer %s"}'', ' ||
    '''{}'', ' ||
    '''1000'');',
    supabase_functions_url,
    supabase_public_key
  );
END $$;